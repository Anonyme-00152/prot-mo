# Modifications des coins arrondis - Projet prot-mo

## Analyse des éléments à modifier

### 1. Variables CSS globales (App.css)
- `--radius: 0.75rem` → Augmenter pour plus d'arrondi global

### 2. Classes Tailwind à modifier dans les fichiers JSX

#### Coins très peu arrondis (à augmenter significativement):
- `rounded` → `rounded-2xl`
- `rounded-sm` → `rounded-xl`
- `rounded-md` → `rounded-2xl`
- `rounded-lg` → `rounded-2xl`
- `rounded-xl` → `rounded-3xl`
- `rounded-2xl` → `rounded-3xl`
- `rounded-[2px]` → `rounded-lg`
- `rounded-[4px]` → `rounded-xl`

#### Éléments circulaires (à conserver):
- `rounded-full` → garder tel quel

#### Fichiers principaux concernés:
- App.jsx
- App_new_part1.jsx
- App_new_part2.jsx
- Tous les composants dans /components/
- Tous les composants UI dans /components/ui/

### 3. Scrollbar personnalisée
- `border-radius: 5px` → augmenter à `12px`

## Stratégie de modification

1. Augmenter la variable `--radius` globale
2. Rechercher et remplacer toutes les classes rounded
3. Vérifier les border-radius en CSS inline
4. Tester l'apparence finale
