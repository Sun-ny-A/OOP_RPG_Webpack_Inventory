import { v4 as uuidv4 } from 'uuid'


export default abstract class InventoryItem{
    id: string = uuidv4()
    name: string
    quantity: number
    price: number
    description: string

    constructor(name: string, price: number, quantity: number, description: string) {
        this.id = uuidv4()
        this.name = name
        this.quantity = quantity
        this.price = price
        this.description = description
    }

    getName(): string {
        return this.name
    }

    getPrice(): number {
        return this.price
    }

    getQuantity(): number {
        return this.quantity
    }

    getDescription(): string {
        return this.description
    }

    static createRPGItems(): InventoryItem[] {
        const initialItems: InventoryItem[] = []
        initialItems.push(new Weapon('Sword', 3, 250, 'Iron sword', 75, 10))
        initialItems.push(new Weapon('Bow and Arrow', 80, 1, 'Carved wood', 50, 25))
        initialItems.push(new Armor('Hauberk', 2, 75, 'Full body', 0))
        initialItems.push(new Weapon('blizzard potion', 300, 2, 'rare potion', 100, 100))
        initialItems.push(new Armor('helment', 4, 50, 'metal', 0))

        return initialItems
    }
}

class Weapon extends InventoryItem {
    private damage: number
    private range: number

    constructor(name: string, price: number, quantity: number, description: string, damage: number, range: number) {
        super(name, price, quantity, description)
        this.damage = damage
        this.range = range
    }

    getDamage(): number {
        return this.damage
    }

    setDamage(damage: number) {
        this.damage = damage
    }

    getRange(): number {
        return this.range
    }

    setRange(range: number) {
        this.range = range
    }

}

class Armor extends InventoryItem {
    private defense: number

    constructor(name: string, price: number, quantity: number, description: string, defense: number) {
        super(name, price, quantity, description)
        this.defense = defense
    }

    getDefense(): number {
        return this.defense
    }

    setDefense(defense: number) {
        this.defense = defense
    }
}

