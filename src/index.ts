import RPGapp from './RPGapp';
import Character from './Character';
import Inventory from './Inventory';
import InventoryItem from './InventoryItem';


const initialCharacter = Character.createRPGCharacter("Initial Character", "Initial Race", "melee")

const initialInventory = new Inventory()
initialInventory.setItems(InventoryItem.createRPGItems())

const app = new RPGapp(initialCharacter, initialInventory)
