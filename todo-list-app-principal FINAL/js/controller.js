(function (window) {
	'use strict';

	/**
	 * Le controller permet de faire l'interaction entre le {@link Model} et la {@Link View}.
	 *
	 * @constructor Controller
	 * @name Controller
	 * @param {object} model - L'instance {@link Model}.
	 * @param {object} view - L'instance {@link View}.
	 */
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('newTodo', function (title) {
			self.addItem(title);
		});

		self.view.bind('itemEdit', function (item) {
			self.editItem(item.id);
		});

		self.view.bind('itemEditDone', function (item) {
			self.editItemSave(item.id, item.title);
		});

		self.view.bind('itemEditCancel', function (item) {
			self.editItemCancel(item.id);
		});

		self.view.bind('itemRemove', function (item) {
			self.removeItem(item.id);
		});

		self.view.bind('itemToggle', function (item) {
			self.toggleComplete(item.id, item.completed);
		});

		self.view.bind('removeCompleted', function () {
			self.removeCompletedItems();
		});

		self.view.bind('toggleAll', function (status) {
			self.toggleAll(status.completed);
		});
	}

	/**
	 * Charge et initialise {@link View}.
	 * @method
	 * @name Controller.setView
	 * @param {string} locationHash - Le hash de la page en cours, peut prendre les valeurs suivantes :
	 *                                 '' | 'active' | 'completed'.
	 */
	Controller.prototype.setView = function (locationHash) {
		var route = locationHash.split('/')[1];
		var page = route || '';
		this._updateFilterState(page);
	};

	/**
	 * Récupère toutes les Todos via le Model et les affiche dans la Todo List grâce à la View.
	 * @method
	 * @name Controller.showAll
	 */
	Controller.prototype.showAll = function () {
		var self = this;
		self.model.read(function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Récupère toutes les Todos actives via le Model et les affiche dans la Todo List grâce à la View.
	 * @method
	 * @name Controller.showActive
	 */
	Controller.prototype.showActive = function () {
		var self = this;
		self.model.read({ completed: false }, function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Récupère toutes les Todos complètes via le Model et les affiche dans la Todo List grâce à la View.
	 * @method
	 * @name Controller.showCompleted
	 */
	Controller.prototype.showCompleted = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			self.view.render('showEntries', data);
		});
	};


	/**
	 * Evénement à déclencher afin de pouvoir ajouter un élément. Il suffit de passer
	 * dans l'objet event et il va gérer l'insertion DOM et la sauvegarde du nouvel élément.
	 * @method
	 * @name Controller.addItem
	 * @param {string} title - Le contenu du todo.
	 */
	Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function () {
			self.view.render('clearNewTodo');
			self._filter(true);
		});
	};

	/**
	 * Active l'édition d'un item.
	 * @method
	 * @name Controller.editItem
	 * @param {number} id - L'ID de la Todo à éditer.
	 */
	Controller.prototype.editItem = function (id) {
		var self = this;
		self.model.read(id, function (data) {
			self.view.render('editItem', {id: id, title: data[0].title});
		});
	};

	/**
	 * Termine le mode d'édition d'un élément avec modification réussie et sauvegardée.
	 * @method
	 * @name Controller.editItemSave
	 * @param {number} id - L'ID du Todo édité à sauvegarder.
	 * @param {string} title - Le contenu du todo modifié.
	 */
	Controller.prototype.editItemSave = function (id, title) {
		var self = this;

		title = title.trim();
		
		if (title.length !== 0) {
			self.model.update(id, {title: title}, function () {
				self.view.render('editItemDone', {id: id, title: title});
			});
		} else {
			self.removeItem(id);
		}
	};

	/**
	 * Annule le mode édition de l'élément.
	 * @method
	 * @name Controller.editItemCancel
	 * @param {number} id - ID de l'item dont la modification est annulée.
	 */
	Controller.prototype.editItemCancel = function (id) {
		var self = this;
		self.model.read(id, function (data) {
			self.view.render('editItemDone', {id: id, title: data[0].title});
		});
	};

	/**
	 * L'ID va permettre de retrouver l'élément du DOM correspondant à celui-ci, et de le supprimer du DOM et du storage.
	 * @method
	 * @name Controller.removeItem
	 * @param {number} id - ID de l'item à supprimer du DOM et du storage
	 */
	Controller.prototype.removeItem = function (id) {
		var self = this;
		var items;
		self.model.read(function(data) {
			items = data;
		});

		self.model.remove(id, function () {
			self.view.render('removeItem', id);
		});

		self._filter();
	};

	/**
	 * Supprime tous les items déclarés complets du DOM et du storage.
	 * @method
	 * @name Controller.removeCompletedItems
	 */
	Controller.prototype.removeCompletedItems = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			data.forEach(function (item) {
				self.removeItem(item.id);
			});
		});

		self._filter();
	};

	/**
	 * Utilise l'id et la checkbox et va mettre à jour l'item dans le storage en fonction du statut de la checkbox.
	 * @method
	 * @name Controller.toggleComplete
	 * @param {number} id - ID de l'item marqué comme complété ou non
	 * @param {object} checkbox - La checkbox sur laquelle vérifier si l'item est complété ou non
	 * @param {boolean|undefined} silent - Evite de filter à nouveau les items
	 */
	Controller.prototype.toggleComplete = function (id, completed, silent) {
		var self = this;
		self.model.update(id, { completed: completed }, function () {
			self.view.render('elementComplete', {
				id: id,
				completed: completed
			});
		});

		if (!silent) {
			self._filter();
		}
	};

	/**
	 * Permet de basculer l'activation / désactivation des cases à cocher en demandant au Model le statut préalable des Todos.
	 * @method
	 * @name Controller.toggleAll
	 * @param {object} completed - Statut de la Checkbox.
	 */
	Controller.prototype.toggleAll = function (completed) {
		var self = this;
		self.model.read({ completed: !completed }, function (data) {
			data.forEach(function (item) {
				self.toggleComplete(item.id, completed, true);
			});
		});

		self._filter();
	};

	/**
	 * Met à jour les parties de la page qui changent en fonction du nombre restant de todos.
	 * @method
	 * @name Controller._updateCount
	 */
	Controller.prototype._updateCount = function (activeRoute) {
		var self = this;
		self.model.getCount(function (todos) {
			self.view.render('updateElementCount', todos.active);
			self.view.render('clearCompletedButton', {
				completed: todos.completed,
				visible: todos.completed > 0 &&
				activeRoute != "Active"
			});

			self.view.render('toggleAll', {checked: todos.completed === todos.total});
			self.view.render('contentBlockVisibility', {visible: todos.total > 0});
		});
	};

	/**
	 * Filtre à nouveau les items en fonction de la route active. 
	 * Appelée après l'ajout ou la suppression pour régénérer l'affichage.
	 * @method
	 * @name Controller._filter
	 * @param {boolean|undefined} force - Force le ré-affichage des items.
	 */
	Controller.prototype._filter = function (force) {
		var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		/**
		 * Met à jour les éléments de la page qui changent à chaque todo complétée
		*/
		this._updateCount(activeRoute);

		/** 
		 * Si la dernière route active n’est pas "All", ou si nous changeons de route, nous
		 * recréons les éléments todo, en appelant :
		 * this.show[All|Active|Completed]();
		*/
		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	};

	/**
	 * Met simplement à jour les routes dans url / filtre.
	 * @method
	 * @name Controller._updateFilterState
	 * @param {string} currentPage - Route de la page actuelle
	 */
	Controller.prototype._updateFilterState = function (currentPage) {
		/** 
		 * Stocker une référence à la route active, nous permettant de re-filtrer todo
 		 * éléments marqués comme complets ou incomplets
 		*/
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this._filter();

		this.view.render('setFilter', currentPage);
	};

	// Exporte vers window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);