/**
 * global NodeList 
 */
(function (window) {
	'use strict';
	
	/**
	 * Récupère un élément par le sélecteur CSS, querySelector
	 * @method
	 * @name window.qs
	 * Utilisé dans {@link View}.
	 * @param {string} selector - élément CSS
	 * @param {object} scope - l'objet dans lequel il peut y avoir l'élément
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	/**
	 * Récupère tous les éléments par le sélecteur CSS, querySelectorAll
	 * @method
	 * @name window.qsa
	 * Utilisé dans {@link View}.
	 * @param {string} selector - élément CSS
	 * @param {object} scope - l'objet dans lequel il peut y avoir les éléments
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * Encapsule addEventListener.
	 * @method
	 * @name window.$on
	 * Utilisé dans {@link View} et {@link Todo}.
	 * @param {object} target - La cible de la fonction.
	 * @param {boolean} type - Le type d'event : Focus ou Blur.
  	 * @param {function} callback - La fonction de rappel.
	 * @param {object} useCapture - L'élément capturé/utilisé.
	 */	
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	* Attache un gestionnaire à l’événement pour tous les éléments, existants ou qui seront créés, et qui correspondent au sélecteur, 
	* (basé sur un élément racine).
	* @method
	* @name window.$delegate
	* Utilisé dans {@link View}.
	* @param {object} target  - La cible.
	* @param {string} selector - un élément HTML.
	* @param {string} type - Le type d'event.
	* @param {function} handler -  Un callback a exécuter sous condition.
	*/
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}
		/**
		* useCapture peut être de type blur ou focus.
		* https://developer.mozilla.org/en-US/docs/Web/Events/blur
		* @type {boolean}
		*/
		var useCapture = type === 'blur' || type === 'focus';
		/**
		 * $on ajoute un eventListener
		 */
		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * Trouve l'élément parent avec le tagName désigné : $parent(qs('a'), 'div');
	 * @method
	 * @name window.$parent
	 * @param {object} element - L'élément actif.
	 * @param {string} tagName - Le tagName de l'élément.
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};
	/**
	 * Autorise les boucles sur les nœuds : qsa('.foo').forEach(function () {})
	 */
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
