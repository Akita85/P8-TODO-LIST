/*jshint laxbreak:true */
(function (window) {
	'use strict';

	var htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	var escapeHtmlChar = function (chr) {
		return htmlEscapes[chr];
	};

	var reUnescapedHtml = /[&<>"'`]/g;
	var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	var escape = function (string) {
		return (string && reHasUnescapedHtml.test(string))
			? string.replace(reUnescapedHtml, escapeHtmlChar)
			: string;
	};

	/**
	 * Définit les valeurs par défaut du Template
	 * @constructor Template
	 * @name Template
	 */
	function Template() {
		this.defaultTemplate
		=	'<li data-id="{{id}}" class="{{completed}}">'
		+		'<div class="view">'
		+			'<input class="toggle" type="checkbox" {{checked}}>'
		+			'<label>{{title}}</label>'
		+			'<button class="destroy"></button>'
		+		'</div>'
		+	'</li>';
	}

	/**
	 * Créé une chaîne de caractère comprenant des éléments HTML <li> et la retourne pour la placer dans l'application.
	 * @method
	 * @name Template.show
	 * @param {object} data - L'objet contenant les clés que nous souhaitons trouver dans le template à remplacer.
	 * @returns {string} Template HTML correspondant à l'élément <li>
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	Template.prototype.show = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = '';
			var checked = '';

			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', escape(data[i].title));
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			view = view + template;
		}

		return view;
	};

	/**
	 * Affiche un compteur du nombre de tâches à terminer.
	 * @method
	 * @name Template.itemCounter
	 * @param {number} activeTodos - le nombre de Todos actives.
	 * @returns {string} Chaîne contenant le nombre
	 */
	Template.prototype.itemCounter = function (activeTodos) {
		var plural = activeTodos === 1 ? '' : 's';

		return '<strong>' + activeTodos + '</strong> item' + plural + ' left';
	};

	/**
	 * Met à jour le texte dans le bouton "Clear completed" (s'affiche si nombre de Todos complètes > 0).
	 * @method
	 * @name Template.clearCompletedButton
	 * @param  {number} completedTodos - Le nombre de Todos complètes.
	 * @returns {string} Chaîne contenant le nombre
	 */
	Template.prototype.clearCompletedButton = function (completedTodos) {
		if (completedTodos > 0) {
			return 'Clear completed';
		} else {
			return '';
		}
	};

	// Exporte vers window
	window.app = window.app || {};
	window.app.Template = Template;
})(window);
