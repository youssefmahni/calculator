class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand= ''
        this.operation = undefined
        }
    delete(){ 
        // take a slice from the character number 0 to -1(last one) 
        this.currentOperand = this.currentOperand.toString().slice(0,-1) 
    }
    appendNumber(number){
        // to add only one period in the currentOperand
        if(number =='.'&& this.currentOperand.includes('.')) return
        // to add characters byside each other
        // this.currentOperand=this.currentOperand.toString()+number.toString()
        this.currentOperand=this.currentOperand + number
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return // can't add operation without operands 
        if(this.previousOperand !== '') this.compute() // to compute the previous operation then add a new one
        
        this.operation= operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
    compute(){
        let computation  //the result of computation 
        const prev = parseFloat(this.previousOperand) // converting the string to float 
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current) ) return // stop coputation if prev or current is not a number

        switch(this.operation){
            case '+':
                computation= prev + current 
                break
            case '-':
                computation= prev - current 
                break
            case '*':
                    computation= prev * current 
                    break
            case '/':
                    computation= prev / current 
                break
            default :
                return
        }
        this.currentOperand = computation;
        this.operation=undefined
        this.previousOperand= ''
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand

        if(this.operation != null){
            this.previousOperandTextElement.innerText= 
            this.previousOperand.toString()+this.operation.toString()
        }
        else{
            this.previousOperandTextElement.innerText= '' // to clear if there is no operation
        }
        
    }
}
// declaration of variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previos-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
//create new calculator 
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement) 
// formating the numberButtons
    numberButtons.forEach(button =>{
        button.addEventListener('click',()=>{
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    } )
// formating the operationButtons
    operationButtons.forEach(button =>{
        button.addEventListener('click',()=>{
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
    } )
// formating the equalsbuttoncurrent 
    equalsButton.addEventListener('click',button => {
        calculator.compute()
        calculator.updateDisplay()
    })
// formating the allClearButton 
    allClearButton.addEventListener('click',button => {
        calculator.clear()
        calculator.updateDisplay()
    })
// formating the deleteButton  
    deleteButton.addEventListener('click',button => {
        calculator.delete()
        calculator.updateDisplay()
    })
    
