import InventoryItem from "./InventoryItem"


export default class Inventory {
    private items: InventoryItem[] = []

    constructor() {
        this.items = []
        this.showItems()
        this.updateInventory()
    }

    getItems(): InventoryItem[] {
        return this.items
    }

    setItems(items: InventoryItem[]) {
        this.items = items
    }

    showItems(): void {
        const shopDiv = document.getElementById("shop")

        if (shopDiv) {
            shopDiv.innerHTML = ""

            this.items.forEach((item) => {
                const itemElement = document.createElement("div")
                itemElement.innerHTML = `
                    <p>Name: ${item.getName()}</p>
                    <p>Price: ${item.getPrice()}</p>
                    <p>Quantity: ${item.getQuantity()}</p>
                    <p>Description: ${item.getDescription()}</p>`
                shopDiv.appendChild(itemElement);
            })
        }
    }

    updateInventory(): void {
        const inventoryDiv = document.getElementById("inventory")

        if (inventoryDiv) {
            inventoryDiv.innerHTML = ""

            if (this.items.length === 0) {
                inventoryDiv.innerHTML = "<p>Your inventory is empty.</p>"
            } else {
                this.items.forEach((item) => {
                    const itemElement = document.createElement("div")
                    itemElement.innerHTML = `
                        <p>Name: ${item.getName()}</p>
                        <p>Price: ${item.getPrice()}</p>
                        <p>Quantity: ${item.getQuantity()}</p>
                        <p>Description: ${item.getDescription()}</p>`
                    
                        inventoryDiv.appendChild(itemElement)
                })
            }
        }
    }
}

class Shop {
    private items: InventoryItem[] = []

    constructor() {
        this.items = []
    }

    getItems(): InventoryItem[] {
        return this.items
    }

    setItems(items: InventoryItem[]) {
        this.items = items
    }
}
