# React + Vite
# Application Todo List
## Fonctions principales

### `addTask`

Ajoute une nouvelle tâche à la liste des tâches `todo`. Chaque nouvelle tâche reçoit un ID unique, le titre saisi par l'utilisateur, et est marquée comme non terminée (`checked: false`) sans date assignée par défaut.

### `updateTask`

Met à jour le titre d'une tâche existante. Cette fonction parcourt la liste des tâches, trouve celle avec l'ID correspondant, et met à jour son titre avec la nouvelle valeur fournie.

### `toggleCheck`

Change l'état de vérification (`checked`) d'une tâche spécifique pour marquer cette tâche comme complétée ou non complétée.

### `deleteTask`

Supprime une tâche de la liste. Cette fonction filtre la liste des tâches, enlevant celle avec l'ID correspondant.

### `updateDate`

Associe une date à une tâche spécifique. Utile pour assigner des échéances ou des rappels à des tâches.

### `handleEdit`

Prépare une tâche pour l'édition. Cette fonction définit `isEditing` et `editValue` pour l'ID et le titre de la tâche spécifiée, permettant à l'utilisateur de modifier son titre.

### `handleUpdate`

Met à jour le titre d'une tâche avec la nouvelle valeur d'édition et quitte le mode d'édition.


