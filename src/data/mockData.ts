// Contas
export const mockAccounts = [
  { id: "1", name: "Conta Corrente" },
  { id: "2", name: "Conta Poupança" },
  { id: "3", name: "Cartão de Crédito" },
  { id: "4", name: "Investimentos" },
]

// Indústrias
export const mockIndustries = [
  "Alimentação",
  "Transporte",
  "Educação",
  "Saúde",
  "Tecnologia",
  "Entretenimento",
  "Serviços",
  "Varejo",
]

// Estados
export const mockStates = ["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF"]

// Categorias
const incomeCategories = ["Salário", "Freelance", "Investimentos"]
const expenseCategories = ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Compras", "Serviços"]

// Função para gerar uma data aleatória nos últimos 12 meses
const randomDate = () => {
  const now = new Date()
  const monthsAgo = Math.floor(Math.random() * 12)
  const daysAgo = Math.floor(Math.random() * 30)

  now.setMonth(now.getMonth() - monthsAgo)
  now.setDate(now.getDate() - daysAgo)

  return now.toISOString().split("T")[0]
}

// Função para gerar um valor aleatório entre min e max
const randomAmount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Função para escolher um item aleatório de um array
const randomItem = (array: any) => {
  return array[Math.floor(Math.random() * array.length)]
}

// Gerar transações mockadas
const generateTransactions = (): any[] => {
  const transactions: any[] = []

  for (let i = 0; i < 100; i++) {
    const type = Math.random() > 0.4 ? "income" : "expense"
    const categoryArray = type === "income" ? incomeCategories : expenseCategories
    const category = randomItem(categoryArray)
    
    const status = Math.random() > 0.2 
      ? "completed" 
      : (Math.random() > 0.5 ? "pending" : "cancelled")
    
    const amount = type === "income" 
      ? randomAmount(1000, 10000) 
      : randomAmount(50, 2000)
    
    transactions.push({
      id: `trans-${i + 1}`,
      description: type === "income" 
        ? `${category} - ${randomItem(["Mensal", "Quinzenal", "Semanal"])}` 
        : `${category} - ${randomItem(["Essencial", "Recorrente", "Eventual"])}`,
      amount,
      type,
      category,
      date: randomDate(),
      status,
      account: randomItem(mockAccounts).id,
      industry: randomItem(mockIndustries),
      state: randomItem(mockStates)
    })
  }

  return transactions
}

export const mockTransactions = generateTransactions()
