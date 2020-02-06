# P8-TODO-LIST

<div class="grid-wrapper">
  <div class="grid-inner">
    <div class="project__contentMargin">
      <div class="jss321">
        <div class="jss320 oc-richContent c111"><p>Dans le monde professionnel, on est souvent amené à reprendre <strong>un projet existant</strong>. Que faire&nbsp;quand vous vous retrouvez avec le code de quelqu'un d'autre ? Comment l'améliorer ? Voilà un savoir-faire qui vous sera très utile au quotidien !</p>
<p>En effet, faire un projet de bout en bout est "facile" : on connaît son fonctionnement sur le bout des doigts. En revanche, on se rend vite compte qu'il est plus dur de <strong>reprendre le travail</strong> de quelqu'un d'autre... surtout quand il n'a pas de tests !</p>
<p>Vous&nbsp;venez d'intégrer&nbsp;une petite équipe qui pense que tous les problèmes du monde viennent du fait que les gens ne&nbsp;sont pas assez organisés et qu'un peu de focus pourrait tout changer ! C'est pourquoi ils ont créé ce qu'ils appellent la meilleur application <strong>"to-do list"</strong> du monde. L'idée elle-même est très bien mais le code derrière n'est pas au top ! Ils vous ont sollicité pour ajouter des tests et régler quelques bugs dans le code.</p>
<p>Commencez par&nbsp;télécharger le code du projet :</p>
<p><a title="Télécharger le projet" href="https://s3-eu-west-1.amazonaws.com/static.oc-static.com/prod/courses/files/project-8-frontend/todo-list-project.zip">Télécharger le projet</a></p>
<p>Regardez comment il est structuré et essayez de comprendre comment il fonctionne. Votre mission sera de <strong>corriger des bugs</strong>, <strong>ajouter des tests</strong>, et optimiser sa performance.</p>
<figure><a href="https://user.oc-static.com/upload/2017/10/19/15083988221397_Screen%20Shot%202017-10-17%20at%2010.52.21%20AM.png" class="oc-imageLink"><img src="https://user.oc-static.com/upload/2017/10/19/15083988221397_Screen%20Shot%202017-10-17%20at%2010.52.21%20AM.png" alt="À vous de faire la meilleur application "></a>
  </br><figcaption>À vous de faire la meilleur application "to-do list" au monde !</figcaption>
</figure>
<aside data-claire-semantic="information">
<p>Il n'est pas nécessaire d'avoir votre code en ligne dans le cadre de ce projet. Cependant, si vous souhaitez construire votre portfolio professionnel et héberger le projet en ligne, notre partenaire 1&amp;1 IONOS offre 2 mois d'hébergement gratuits aux étudiants pour toute souscription à un pack d'hébergement <a href="https://www.ionos.fr/hebergement/hebergement-web?ac=OM.FR.FRo73K404518T7073a&amp;couponCode=AGNBMACB">(plus d'infos)</a>.</p>
</aside>
<h3>Etape 1 : Corrigez les bugs</h3>
<p>Il y a deux bugs dans le code et c'est votre mission de les trouver ! Voici quelques indices:</p>
<ul>
<li>Le premier est une faute de frappe.</li>
<li>Le deuxième introduit un conflit éventuel entre deux IDs identiques.</li>
</ul>
<p>Vous allez chercher ces bugs dans le code, un peu comme dans "Où est Charlie". Une fois les bugs trouvés, corrigez-les ! Ils empêchent le code de marcher correctement (pour l'instant ce n'est même pas possible d'ajouter des tâches à la liste à cause de ces bugs).</p>
<p>Il y a également des améliorations à faire, même s'il ne s'agit pas de bugs proprement dit. Essayez de trouver où vous pouvez optimiser des boucles et vérifiez s'il y a des fonctions qui affichent des informations dans la console de déboggage&nbsp; qui ne sont pas nécessaires.</p>
<h3>Etape 2 : où sont les tests ?!</h3>
<p>Vous allez voir que ce projet a déjà quelques tests mais largement pas assez ! Pour le prendre en main, vous allez ajouter tous les tests unitaires et fonctionnels &nbsp;pertinents que vous pouvez. L'objectif est de solidifier le projet. Ainsi, lorsque vous le modifierez par la suite, vous pourrez vous baser sur ces tests pour vérifier que vous ne "cassez" rien.</p>
<p>Cette étape peut paraître un peu longue et fastidieuse, mais elle est nécessaire pour gagner beaucoup de temps et éviter des surprises à l'avenir !</p>
<aside data-claire-semantic="warning">
<p>Il est nécessaire d'utiliser la commande &nbsp;<code data-claire-semantic="text">npm install</code>&nbsp; pour installer tous les fichiers Jasmine.</p>
</aside>
<p>Il y a déjà un<strong> fichier existant</strong> pour les tests de ce projet : &nbsp;<code data-claire-semantic="text">ControllerSpec.js</code>&nbsp;.&nbsp; À l'intérieur de ce fichier, quelques tests à ajouter sont indiqués dans le code. Ils sont indiqués avec le commentaire suivant :</p>
<pre><code data-claire-semantic="text"><div class="ace-monokai"><div class="ace_static_highlight ace_show_gutter" style="counter-reset:ace_line 0"><div class="ace_line"><span class="ace_gutter ace_gutter-cell" unselectable="on"></span>// TODO: write test
</div></div></div></code></pre>
<p>Plus précisément, vous pouvez les trouver sur les lignes #62, #86, #90, #137, #141, #146, #150, #156, et #196 de &nbsp;<code data-claire-semantic="text">ControllerSpec.js</code>&nbsp;.</p>
<p>Vous pouvez aller plus loin et ajouter des tests supplémentaires si vous le voulez !</p>
<aside data-claire-semantic="information">
<p>Astuce : gagnez du temps en adoptant la méthode TDD. Comme beaucoup de développeur·ses, si vous rédigez vos tests et corrigez des bugs en même temps, vous pouvez utiliser des tests pour identifier ce qui ne fonctionne pas - ce qui accélère la correction des bugs.</p>
</aside>
<h3>Etape 3 : optimisez la performance</h3>
<p>Votre équipe vous&nbsp;a demandé d'analyser la performance d'un site concurrent pour identifier ce qui marche bien et ce qui ne marche pas, au cas où vous décidez de "scaler" votre propre application. Voici <a title="le site" href="http://todolistme.net/">le site</a> du concurrent.</p>
<p>Utilisez la console de développement de votre navigateur pour analyser la performance du site. Faites attention aux ressources utilisées par les différents éléments du site (par exemple, ce qui est lent, ce qui est rapide, etc) et aux ressources utilisées par les publicités sur le site et celles utilisées pour effectuer les fonctionnalités "To-do" pour la liste elle-même.</p>
<p>Maintenant, vous allez faire un audit de performance. En vous appuyant sur les données, écrivez un document de 300 à 500 mots qui décrit la performance du site, comment il se distingue de votre application, et comment optimiser la performance en vue d'un éventuel "scaling" de votre application.</p>
<h3>Etape 4 : améliorez le projet</h3>
<p>Maintenant que vous connaissez ce code par cœur, vous pouvez facilement ajouter des informations supplémentaires à votre documentation. Vous êtes désormais prêt à écrire de la documentation technique ! Jetez un œil <a title="aux exemples suivants" href="https://www.atlassian.com/blog/add-ons/5-real-life-examples-beautiful-technical-documentation">aux exemples suivants</a> pour vous inspirer.</p>
<p>Pour le dire plus simplement, il faut documenter les éléments suivants :</p>
<ul>
<li>le projet lui-même (l'usage non technique)</li>
<li>comment il fonctionne techniquement</li>
<li>votre audit</li>
</ul>
<p>Vous pouvez utiliser le format que vous souhaitez (ex. un wiki sur Github, un document en format texte, etc).</p>
<h3>Livrables</h3>
<ul>
<li>La <strong>base de code</strong> mise à jour avec les améliorations et les tests</li>
<li>La <strong>documentation technique</strong> de votre projet, y compris votre audit, sous le format que vous souhaitez</li>
</ul>
<aside data-claire-semantic="information">
<p>Pour faciliter votre passage au jury, déposez sur la plateforme, dans un dossier nommé “<em>P8_nom_prenom</em>”, tous les livrables du projet. Chaque livrable doit être nommé avec le numéro du projet et selon l'ordre dans lequel il apparaît, par exemple “<em>P8_01_code</em>”, “<em>P8_02_doctechnique</em>”, et ainsi de suite.</p>
</aside>
<p>&nbsp;</p>
<h3>Soutenance</h3>
<p>Vous ferez une presentation de votre projet avec un évaluateur, afin de simuler des conditions réelles.</p>
<p>La présentation suivra la structure ci-dessous :</p>
<ul>
<li>Présentation de votre code, des tests et de vos optimisations : 15-20 minutes</li>
<li>Questions / réponses : 10 minutes</li>
</ul>
<p>À la fin de votre présentation, l'évaluateur fera un débriefing pendant environ 5 minutes.</p></div>
      <h3 class="MuiTypography-root project__instructionTitle MuiTypography-h3 MuiTypography-displayBlock"><span>Compétences évaluées</span></h3>
      <div class="project__skills">
        <li><span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1">Mettre en oeuvre des tests unitaires et fonctionnels dans une application web</span></li>
    <li ><span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1">Optimiser les performances d'un projet à l'aide des DevTools</span></li>
        <li><span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1">Reprendre en main un projet JavaScript existant</span></li></div></div></div></div>
