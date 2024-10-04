// noinspection SuspiciousTypeOfGuard

import defaultConfigs from "./configs"

interface StoreConfigs {
	/**
	 * Persist the data on refresh using localStorage (works only on browser env)
	 */
	persist?: boolean

	/**
	 * Allow store to overwrite data when data already exists
	 */
	allowExistingData?: boolean
}
class Store<T extends object> {
	/**
	 * Store data
	 */
	data: Map<keyof T, T[keyof T]>

	/**
	 * Binded effects
	 */
	effects: Map<keyof T, T[keyof T]>

	/**
	 * Store configs
	 */
	configs: StoreConfigs

	constructor(configs: StoreConfigs = {}) {
		this.data = new Map()
		this.effects = new Map()
		this.configs = { ...defaultConfigs, ...configs }
	}


	/**
	 * Add data to the store
	 * @param {String | Number} name - Name of the key for store data
	 * @param {any} value - Initial value of the data
	 * @param {Function} [effect] - Effect to run when data is updated
	 */
	add(name: keyof T, value: T[keyof T], effect?: (value?: any, oldValue?: any) => void) {


		if (this.configs["allowExistingData"] === false && this.data.has(name)) {
			throw new Error(`${name.toString()} already exists in the store`)
		}

		this.data.set(name, value)

		if (effect) {
			this.listen(name, effect)
		}
	}

	/**
	 * Get data from store
	 * @param {String | Number} name - Name of the data
	 */
	get(name: keyof T) {
		return this.data.get(name)
	}

	/**
	 * Get all data from store
	 */
	all() {
		const object: any = {}

		this.data.forEach((value, key) => {
			object[key] = value
		})

		return object as T
	}

	/**
	 * Get specifics data from the store
	 * @param fields - Fields to be selected
	 */
	only(fields: Array<keyof T> = []) {
		if (!Array.isArray(fields)) {
			throw new Error("The only method should only receive an array as argument")
		}

		const filteredObject: any = {}

		fields.forEach((field) => {
			filteredObject[field] = this.get(field)
		})

		return filteredObject
	}

	/**
	 * Verify if a data exists in the store
	 * @param {String  | Number} name - Name of data
	 */
	has(name: keyof T) {
		return this.data.has(name)
	}

	/**
	 * Update data in the store and run the effects
	 * @param {String | Number} name - Name of the data to update value
	 * @param {any} value - Value to be updated
	 */
	update(name: keyof T, value: any) {
		if (!this.data.has(name)) {
			throw new Error(`${name.toString()} does not exists in the store`)
		}

		const oldValue = this.data.get(name)
		this.data.set(name, value)

		// Run effects
		this.runEffects(name, value, oldValue)
	}

	/**
	 * Delete some data in the store
	 * @param {String | Number} name - Name of data to be deleted
	 */
	delete(name: keyof T) {
		if (!this.data.has(name)) {
			throw new Error(`${name.toString()} does not exists in the store`)
		}

		this.data.delete(name)
	}

	/**
	 * Bind an effect to a data in the store
	 * @param {String | Number} name - Name of the data where the effect will be binded
	 * @param {Function} callback - Effect to run when data updated
	 */
	listen(name: keyof T, callback: (value?: any, oldValue?: any) => void) {
		if (!this.data.has(name)) {
			throw new Error(`${name.toString()} does not exists in the store`)
		}

		if (!this.effects.has(name)) {
			// @ts-ignore
			this.effects.set(name, [])
		}

		const currentEffects = this.effects.get(name)
		// @ts-ignore
		this.effects.set(name, [...currentEffects, callback])
	}

	/**
	 * Run effects of some data change in the store
	 * @param {String  | Number} name - Name of the data
	 * @param {any} value - New value
	 * @param {any} oldValue - Old value of that data
	 */
	private runEffects(name: keyof T, value: any, oldValue: any) {
		if (this.effects.has(name)) {
			// @ts-ignore
			this.effects.get(name)?.forEach((callback: (value?: any, oldValue?: any) => void) => {
				callback(value, oldValue)
			})
		}
	}
}

export {
	Store
}
export default Store
