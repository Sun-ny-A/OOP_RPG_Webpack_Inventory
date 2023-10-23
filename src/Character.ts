import { v4 as uuidv4 } from 'uuid'
import InventoryItem from "./InventoryItem"

export default class Character {
    private id: string = uuidv4()
    private name: string
    private archtype: string
    private fightingStyle: 'melee' | 'ranged'
    private inventory: InventoryItem[] = []

    constructor(name: string, archtype: string, fightingStyle: 'melee' | 'ranged') {
        this.id = uuidv4()
        this.name = name
        this.archtype = archtype
        this.fightingStyle = fightingStyle
        this.inventory = []
        this.updateInventoryDisplay()
        this.inventoryHTMLElement()
        this.addRemoveEventListeners()
    }

    getName(): string {
        return this.name
    }

    getArchtype(): string {
        return this.archtype
    }

    getFightingStyle(): 'melee' | 'ranged' {
        return this.fightingStyle
    }

    getInventory(): InventoryItem[] {
        return this.inventory
    }

    setName(name: string) {
        this.name = name
    }

    setArchtype(archtype: string) {
        this.archtype = archtype
    }

    setFightingStyle(fightingStyle: 'melee' | 'ranged') {
        this.fightingStyle = fightingStyle
    }

    setInventory(inventory: InventoryItem[]) {
        this.inventory = inventory;
    }

    addToInventory(item: InventoryItem) {
        this.inventory.push(item)
    }

    removeFromInventory(item: InventoryItem) {
        this.inventory = this.inventory.filter((i) => i !== item)
    }

    removeQuantityFromInventory(item: InventoryItem, quantity: number) {
        const index = this.inventory.indexOf(item)
        if (index !== -1) {
            for (let i = 0; i < quantity; i++) {
                this.inventory.splice(index, 1)
            }
        }
    }

    inventoryValue(): number {
        return this.inventory.reduce((total, item) => total + item.getPrice(), 0)
    }

    printInventory() {
        this.inventory.forEach((item) => {
            console.log(`
            Name: ${item.getName()}, 
            Price: ${item.getPrice()}, 
            Quantity: ${item.getQuantity()},
            Description: ${item.getDescription()}`)
        })
    }

    static createRPGCharacter(name: string, race: string, fightingStyle: 'melee' | 'ranged'): Character {
        return new Character(name, race, fightingStyle)
    }

    inventoryHTMLElement(): HTMLElement {
        const inventoryContainer = document.createElement("div")
        this.inventory.forEach((item) => {
            const itemElement = document.createElement("div")
            itemElement.innerHTML = `
                <p>Name: ${item.getName()}</p>
                <p>Price: ${item.getPrice()}</p>
                <p>Quantity; ${item.getQuantity()}>/p>
                <p>Description: ${item.getDescription()}</p>`

            const removeOneButton = document.createElement("button")
            removeOneButton.innerText = "Remove One"
            removeOneButton.addEventListener("click", () => {
                this.removeQuantityFromInventory(item, 1)
                inventoryContainer.innerHTML = ""
                inventoryContainer.appendChild(this.inventoryHTMLElement())
            })

            const removeAllButton = document.createElement("button")
            removeAllButton.innerText = "Remove All"
            removeAllButton.addEventListener("click", () => {
                this.removeFromInventory(item)
                inventoryContainer.innerHTML = ""
                inventoryContainer.appendChild(this.inventoryHTMLElement())
            })

            itemElement.appendChild(removeOneButton)
            itemElement.appendChild(removeAllButton)
            inventoryContainer.appendChild(itemElement)
        })

        return inventoryContainer
    }

    addRemoveEventListeners(): void {
        this.inventory.forEach((item) => {
            const removeOneButton = document.getElementById(`removeOne_${item.id}`)
            const removeAllButton = document.getElementById(`removeAll_${item.id}`)

            if (removeOneButton && removeAllButton) {
                removeOneButton.addEventListener("click", () => {
                    this.removeQuantityFromInventory(item, 1)
                    this.updateInventoryDisplay()
                })

                removeAllButton.addEventListener("click", () => {
                    this.removeFromInventory(item)
                    this.updateInventoryDisplay()
                })
            }
        })
    }

    updateInventoryDisplay(): void {
        const inventoryContainer = document.getElementById("inventoryContainer")
        if (inventoryContainer) {
            inventoryContainer.innerHTML = ""
            inventoryContainer.appendChild(this.inventoryHTMLElement())
            this.addRemoveEventListeners()
        }
    }


}



// const character = Character.createRPGCharacter("name", "race", "melee");
// console.log(character)
