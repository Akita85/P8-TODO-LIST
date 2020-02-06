/*jshint eqeqeq:false */
(function (window) {
	'use strict';

	/**
	 * Crée un nouvel objet de stockage côté client et crée un jeu de données vide si aucun n'existe.
	 * @constructor Store
	 * @name Store
	 * @param {string} name - le nom de la Base de Données que nous souhaitons utiliser
	 * @param {function} callback - Notre BD utilise les callbacks 
	 * mais en condition réelle nous ferions probablement des appels AJAX 
	 */
	function Store(name, callback) {
		callback = callback || function () {};

		this._dbName = name;

		if (!localStorage[name]) {
			var data = {
				todos: []
			};

			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	}

	/**
	 * Trouve les items en fonction d'une requête faite sous la forme d'un objet JS.
	 * @method
	 * @name Store.find
	 * @param {object} query - La requête à comparer ({foo: 'bar'})
	 * @param {function} callback -	callback appelée quand la requête est terminée
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // data retournera tous les éléments qui ont foo: bar et
	 *	 hello: world dans leurs propriétés
	 * });
	 */
	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(this, todos.filter(function (todo) {
			for (var q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
	};

	/**
	 * Retrouve toutes les données de la collection
	 * @method
	 * @name Store.findAll
	 * @param {function} callback - Appelée lors de la récupération des données
	 */
	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

	/**
	 * Sauvegarde les données dans la BD. Crée un nouvel item si aucun n'existe, 
	 * sinon met à jour les propriétés d'un item existant.
	 * @method
	 * @name Store.save
	 * @param {object} updateData - La donnée à enregistrer dans la BD
	 * @param {function} callback - La fonction de rappel après l'enregistrement
	 * @param {number} id - Un paramètre optionnel correspondant à l'ID d’un item à mettre à jour
	 */
	Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		/** 
		 * Si un ID a été donné, trouve l’élément et met à jour chaque propriété
		 */
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {
			
			/** 
			 * Génère et assigne un ID unique
			 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/now 
		 	*/
			updateData.id = Date.now();
			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};

	/**
	 * Supprime un item de la BD en fonction de son id.
	 * @method
	 * @name Store.remove
	 * @param {number} id - l'ID de l'item que nous voulons supprimer
	 * @param {function} callback - Fonction à appeler après la sauvegarde
	 */
	Store.prototype.remove = function (id, callback) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;
		var todoId;
		
		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todoId = todos[i].id;
			}
		}

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == todoId) {
				todos.splice(i, 1);
			}
		}

		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, todos);
	};

	/**
	 * Supprime toutes les données de la BD et réinitialise un tableau vide
	 * @method
	 * @name Store.drop
	 * @param {function} callback - appelée après avoir supprimé toutes les données. 
	 */
	Store.prototype.drop = function (callback) {
		var data = {todos: []};
		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, data.todos);
	};

	// Exporte vers window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);