import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantsFilterSection = props => {
  const {activeOptionValue, onChangeOption, sortOptions} = props
  const onChangeSelect = event => {
    onChangeOption(event.target.value)
  }

  return (
    <div className="filter-section">
      <h1 className="popular-restaurants">Popular Restaurants</h1>
      <div className="filter-container">
        <p>
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-section">
          <BsFilterLeft size={24} color="#475569" />
          <p>Sort By</p>
          <select
            className="sort-by"
            onChange={onChangeSelect}
            value={activeOptionValue}
          >
            {sortOptions.map(each => (
              <option key={each.id} value={each.value}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
    </div>
  )
}
export default RestaurantsFilterSection
