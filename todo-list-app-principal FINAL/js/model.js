(function (window) {
	'use strict';

	/**
	 * Crée une nouvelle instance de Model et la connecte au Store.
	 * @constructor Model
	 * @name Model
	 * @param {object} storage - La classe servant à la sauvegarde des données côté client {@link Store}.
	 */
	function Model(storage) {
		this.storage = storage;
	}

	/**
	 * Crée un nouveau modèle de Todo
	 * @method
	 * @name Model.create
	 * @param {string} [title] - L'intitulé de la tâche
	 * @param {function} [callback] - La fonction de rappel après la création du modèle.
	 */
	Model.prototype.create = function (title, callback) {
		title = title || '';
		callback = callback || function () {};

		var newItem = {
			title: title.trim(),
			completed: false
		};

		this.storage.save(newItem, callback);
	};

	/**
	 * Trouve et renvoie un modèle dans le storage. Si aucune requête n'est précisée, il va simplement
	 * tout retourner. Si nous passons une chaîne ou un numéro, cela sera considéré comme étant l'identifiant
	 * du modèle à trouver. Enfin, nou spouvons lui passer un objet.
	 * @method
	 * @name Model.read
	 * @param {string|number|object} [query] - Requête servant de référence pour la recherche
	 * @param {function} [callback] - Callback à appeler après que la tâche a été trouvée
	 *
	 * @example
	 * model.read(1, func); // Trouvera le modèle avec un ID de 1
	 * model.read('1'); // comme ci-dessus
	 * //Nous trouvererons ci-dessous un modèle avec foo égale à bar et un hello égale à world.
	 * model.read({ foo: 'bar', hello: 'world' });
	 */
	Model.prototype.read = function (query, callback) {
		var queryType = typeof query;
		callback = callback || function () {};

		if (queryType === 'function') {
			callback = query;
			return this.storage.findAll(callback);
		} else if (queryType === 'string' || queryType === 'number') {
			query = parseInt(query, 10);
			this.storage.find({ id: query }, callback);
		} else {
			this.storage.find(query, callback);
		}
	};

	/**
	 * Met à jour un modèle en lui donnant un identifiant, des données à mettre à jour, et une fonction de rappel lorsque
	 * la mise à jour est terminée.
	 * @method
	 * @name Model.update
	 * @param {number} id - ID du modèle à mettre à jour.
	 * @param {object} data - Les données à mettre à jour et leurs nouvelles valeurs.
	 * @param {function} callback - Callback à appeler quand la tâche a été mise à jour.
	 */
	Model.prototype.update = function (id, data, callback) {
		this.storage.save(data, callback, id);
	};

	/**
	 * Supprime un modèle du Stockage
	 * @method
	 * @name Model.remove
	 * @param {number} id - l'ID du modèle à supprimer
	 * @param {function} callback - Callback à appeler une fois la suppression terminée.
	 */
	Model.prototype.remove = function (id, callback) {
		this.storage.remove(id, callback);
	};

	/**
	 * ATTENTION : supprimera toutes les données du Stockage.
	 * @method
	 * @name Model.removeAll
	 * @param {function} callback - Callback à appeler quand tout le Stockage est vidé.
	 */
	Model.prototype.removeAll = function (callback) {
		this.storage.drop(callback);
	};

	/**
	 * Retourne le nombre total de tâches contenues dans le stockage
	 * @method
	 * @name Model.getCount
	 * @param {function} callback - Callback à appeler pour boucler sur toutes les todos.
	 */
	Model.prototype.getCount = function (callback) {
		var todos = {
			active: 0,
			completed: 0,
			total: 0
		};

		this.storage.findAll(function (data) {
			data.forEach(function (todo) {
				if (todo.completed) {
					todos.completed++;
				} else {
					todos.active++;
				}

				todos.total++;
			});
			callback(todos);
		});
	};

	// Exporte vers window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
