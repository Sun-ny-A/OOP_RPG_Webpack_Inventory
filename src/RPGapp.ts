import Character from "./Character"
import Inventory from "./Inventory"
import InventoryItem from './InventoryItem'

export default class RPGapp {
  private container: HTMLElement
  private character: Character
  private inventory: Inventory

  constructor(character: Character, inventory: Inventory) {
    this.container = document.querySelector('main') as HTMLElement
    this.character = character
    this.inventory = inventory
    const createCharacterForm = document.querySelector('#createCharacterForm') as HTMLFormElement
    createCharacterForm.addEventListener('submit', this.createCharacter.bind(this))
  }

  createCharacter(e: Event) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const race = formData.get('race') as string
    const fightingStyle = formData.get('fightingStyle') as 'melee' | 'ranged'

    if (name && race && (fightingStyle === 'melee' || fightingStyle === 'ranged')) {
      this.character = Character.createRPGCharacter(name, race, fightingStyle)
      this.displayCharacter()
    }
  }

  displayCharacter() {
    const characterNameElement = document.querySelector('#character-name') as HTMLElement
    if (characterNameElement) {
      characterNameElement.textContent = `Character Name: ${this.character.getName()}`
    }
    this.character.updateInventoryDisplay()
  }
}
