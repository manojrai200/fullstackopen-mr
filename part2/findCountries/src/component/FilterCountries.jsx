const FilterCountries = ({ filter, handleFilterChange }) => {
  return(
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default FilterCountries