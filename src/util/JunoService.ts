interface JunoProps {
  cardNumber: string
  holderName: string
  securityCode: string
  expirationMonth: string
  expirationYear: string
}

const JunoService = {
  execute(card: JunoProps): Promise<string> {
    // chave primeiro parametro
    let checkout = new DirectCheckout('PUBLIC TOKEN (gerar no site da juno em integraçoes)', false)
    let cardData = card

    return new Promise((resolve, reject) => {
      checkout.getCardHash(cardData, 
        (data) => resolve(data), 
        (error) => reject(error)
      )
    })
  }
}

export default JunoService
