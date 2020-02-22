/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
	'use strict';

	/**
	 * Initialise la vue en fonction du {@link Template}.
	 * @constructor View
	 * @name View
	 * @param {object} template - le template
	 */
	function View(template) {
		this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

		this.$todoList = qs('.todo-list');
		this.$todoItemCounter = qs('.todo-count');
		this.$clearCompleted = qs('.clear-completed');
		this.$main = qs('.main');
		this.$footer = qs('.footer');
		this.$toggleAll = qs('.toggle-all');
		this.$newTodo = qs('.new-todo');
	}

	/**
	 * Supprime la Todo de la vue en fonction de l’id passé en paramètre.
	 * @method
	 * @name View._removeItem
	 * @param {number} id - L'ID de l'élément à supprimer.
	*/
	View.prototype._removeItem = function (id) {
		var elem = qs('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	};

	/**
	 * Rend visible ou non le bouton "clear completed" en fonction de Template.prototype.clearCompletedButton
	 * @method
	 * @name  View._clearCompletedButton
	 * @param  {number} completedCount - Nombre de tâches complétées.
	 * @param  {boolean} visible - True si visible, false si non. Détermine la visibilité du bouton.
	 */
	View.prototype._clearCompletedButton = function (completedCount, visible) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
		this.$clearCompleted.style.display = visible ? 'block' : 'none';
	};

	/**
	 * Met en valeur le bouton de filtre de la page actuelle (nom de la page passée en paramètre).
	 * @method
	 * @name  View._setFilter
	 * @param  {string} currentPage - Page actuelle ayant comme valeur vide '', ou Active, ou Completed. Routage de la page.
	 */
	View.prototype._setFilter = function (currentPage) {
		qs('.filters .selected').className = '';
		qs('.filters [href="#/' + currentPage + '"]').className = 'selected';
		this.$newTodo.focus();
	};

	/**
	 * Gère l'affichage des tâches marquées comme complétées en testant si l'élément est terminé.
	 * @method
	 * @name  View._elementComplete
	 * @param  {number} id - L'ID de l'élément à tester.
	 * @param  {bolean} completed - détermine le statut de l'élément.
	 */
	View.prototype._elementComplete = function (id, completed) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = completed ? 'completed' : '';

		// Dans le cas où il a été basculé à partir d’un événement et non en cliquant sur la case à cocher
		qs('input', listItem).checked = completed;
	};

	/**
	 * Affiche le mode édition d'un élément.
	 * @method
	 * @name  View._editItem
	 * @param  {number} id - L'ID de l'élément à éditer.
	 * @param  {string} title - Le titre de la Todo.
	 */
	View.prototype._editItem = function (id, title) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = listItem.className + ' editing';

		var input = document.createElement('input');
		input.className = 'edit';

		listItem.appendChild(input);
		input.focus();
		input.value = title;
	};

	/**
	 * Termine l'action d'éditer et affiche le nouveau titre de la todo.
	 * @method
	 * @name  View._editItemDone
	 * @param  {number} id - L'ID de l'élément modifié.
	 * @param  {string} title - Le nouveau titre de la Todo.
	 */
	View.prototype._editItemDone = function (id, title) {
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		var input = qs('input.edit', listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace('editing', '');

		qsa('label', listItem).forEach(function (label) {
			label.textContent = title;
		});
	};

	/**
	 * Exécute la commande passée en paramètre (controller.js) et appelle la méthode de View.js correspondante. Met à jour le DOM.
	 * @method
	 * @name  View.render
	 * @param  {string} viewCmd - La fonction active.
	 * @param  {object} parameter - Les paramètres de la fonction active.
	 */
	View.prototype.render = function (viewCmd, parameter) {
		var self = this;
		var viewCommands = {
			/**
			 * Affiche les éléments
			 */
			showEntries: function () {
				self.$todoList.innerHTML = self.template.show(parameter);
			},
			/**
			 * Supprime un élément
			 */
			removeItem: function () {
				self._removeItem(parameter);
			},
			/**
			 * Met à jour le compteur
			 */
			updateElementCount: function () {
				self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
			},
			/**
			 * Affiche le bouton 'clearCompleted'
			 */
			clearCompletedButton: function () {
				self._clearCompletedButton(parameter.completed, parameter.visible);
			},
			/**
			 * Vérifie la visibilité d'un élément
			 */
			contentBlockVisibility: function () {
				self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
			},
			/**
			 * Gère l'évènement qui complète toutes les todos et inversement.
			 */
			toggleAll: function () {
				self.$toggleAll.checked = parameter.checked;
			},
			/**
			 * Filtre les éléments
			 */
			setFilter: function () {
				self._setFilter(parameter);
			},
			/**
			 * Vide le contenu dans l'input du header après ajout d'une nouvelle todo
			 */
			clearNewTodo: function () {
				self.$newTodo.value = '';
			},
			/**
			 * Affiche les éléments avec le statut completed
			 */
			elementComplete: function () {
				self._elementComplete(parameter.id, parameter.completed);
			},
			/**
			 * Permet d'éditer un élément
			 */
			editItem: function () {
				self._editItem(parameter.id, parameter.title);
			},
			/**
			 * Sort du mode édition et sauvegarde la modification d'un élément
			 */
			editItemDone: function () {
				self._editItemDone(parameter.id, parameter.title);
			}
		};

		viewCommands[viewCmd]();
	};

	/**
	 * Retourne l'ID d'une Todo
	 * @method
	 * @name  View._itemId
	 * @param  {object} element - Element cible
	 */
	View.prototype._itemId = function (element) {
		var li = $parent(element, 'li');
		return parseInt(li.dataset.id, 10);
	};

	/**
	 * EventListener pour la validation de l'édition d'un élément. C'est à dire quitter le mode édition en appuyant sur "Entrer"
	 * ou en cliquant en dehors du champs de saisie
	 * @method
	 * @name  View._bindItemEditDone
	 * @param {function} handler - Méthode attachée à l'éxecution de l'évènement (appelée sous condition).
	 */
	View.prototype._bindItemEditDone = function (handler) {
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'blur', function () {
			if (!this.dataset.iscanceled) {
				handler({
					id: self._itemId(this),
					title: this.value
				});
			}
		});

		$delegate(self.$todoList, 'li .edit', 'keypress', function (event) {
			if (event.keyCode === self.ENTER_KEY) {
				// Retire le curseur de la zone de saisie après avoir appuyé sur la touche "Entrée"
				this.blur();
			}
		});
	};

	/**
	 * EventListener pour l'annulation de la modification d'un élément. 
	 * Quitte le mode édition en appuyant sur la touche "escape"
	 * @method
	 * @name  View._bindItemEditCancel
	 * @param {function} handler - Méthode attachée à l'éxecution de l'évènement (appelée sous condition).
	 */
	View.prototype._bindItemEditCancel = function (handler) {
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'keyup', function (event) {
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({id: self._itemId(this)});
			}
		});
	};

	/**
	 * Associe une liste d'évènements à une méthode passée en paramètre.
	 * Fait le lien entre les méthodes du {@link Controller} et les éléments de {@link View}.
	 * @method
	 * @name  View.bind
	 * @param  {function} event -  L'évenement actif.
	 * @param  {function} handler - Méthode attachée à l'éxecution de l'évènement (appelée sous condition).
	 */
	View.prototype.bind = function (event, handler) {
		var self = this;
		if (event === 'newTodo') {
			$on(self.$newTodo, 'change', function () {
				handler(self.$newTodo.value);
			});

		} else if (event === 'removeCompleted') {
			$on(self.$clearCompleted, 'click', function () {
				handler();
			});

		} else if (event === 'toggleAll') {
			$on(self.$toggleAll, 'click', function () {
				handler({completed: this.checked});
			});

		} else if (event === 'itemEdit') {
			$delegate(self.$todoList, 'li label', 'dblclick', function () {
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemRemove') {
			$delegate(self.$todoList, '.destroy', 'click', function () {
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemToggle') {
			$delegate(self.$todoList, '.toggle', 'click', function () {
				handler({
					id: self._itemId(this),
					completed: this.checked
				});
			});

		} else if (event === 'itemEditDone') {
			self._bindItemEditDone(handler);

		} else if (event === 'itemEditCancel') {
			self._bindItemEditCancel(handler);
		}
	};

	// Exporte vers window
	window.app = window.app || {};
	window.app.View = View;
}(window));
