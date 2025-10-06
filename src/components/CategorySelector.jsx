import { categories } from '../services/categoryService'

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-sage-500 to-indigo-500 text-white'
              : 'glass-morphism text-sage-700 dark:text-sage-300 hover:bg-white/20'
          }`}
        >
          <span className="mr-1">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategorySelector