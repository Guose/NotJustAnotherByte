const config = {
  baseApiUrl: "http://localhost:5000",
}

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const dateFormatter = (dateInput: string | Date) => {
  console.log("Input:", dateInput)
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  console.log("Parsed Date:", date)
  if (isNaN(date.getTime())) {
    console.error("Invalid Date:", dateInput)
    return "Invalid Date"
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default config
export {
  currencyFormatter,
  dateFormatter,
}