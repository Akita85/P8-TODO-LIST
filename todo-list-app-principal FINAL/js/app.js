/*global app, $on */
(function () {
	'use strict';

	/**
	 * Crée une toute nouvelle Todo List.
	 * @constructor Todo
	 * @name Todo
	 * @param {string} name Nom de notre Todo List.
	 */
	function Todo(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	/**
	 * Création de l'objet todo.
	 */
	var todo = new Todo('todos-vanillajs');

	/**
	 * Gère l'URL de la page. Notamment le hash ''|| active || completed.
	 * @method
	 * @name setView
	 */
	function setView() {
		todo.controller.setView(document.location.hash);
	}
	/**
	 * Evènement load est émis lorsque les ressources sont complètement chargées.
	 * @event
	 * */
	$on(window, 'load', setView);

	/**
	 * Evènement hashchange est déclenché lorsque le hash de l'url change.
	 * @event
	 * */
	$on(window, 'hashchange', setView);
})();
