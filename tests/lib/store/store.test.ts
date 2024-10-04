import { describe, expect, test } from "bun:test"
import Store from "../../../src/lib/store"

describe("Lib/Store", () => {
	test("Storage", () => {
		const store = new Store<{
			testNum: number
			testStr: string
			testBool: boolean
		}>()

		store.add("testNum", 2)
		store.add("testStr", "test")
		store.add("testBool", true)

		expect(store.get("testNum")).toBe(2)
		expect(store.get("testStr")).toBe("test")
		expect(store.get("testBool")).toBe(true)
	})

	test("Listeners", async () => {
		const store = new Store<{
			testNum: number
			testStr: string
			testBool: boolean
		}>()
		let newNum: any = null
		let newStr: any = null
		let newBool: any = null
		store.add("testNum", 0, (value) => (newNum = value))
		store.add("testStr", "", (value) => (newStr = value))
		store.add("testBool", false, (value) => (newBool = value))

		await new Promise<void>((resolve) => {
			setTimeout(() => {
				store.update("testNum", 2)
				store.update("testStr", "test")
				store.update("testBool", true)
				resolve()
			}, 5)
		})
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				expect(newNum).toBe(2)
				expect(newStr).toBe("test")
				expect(newBool).toBe(true)
				resolve()
			}, 5)
		})
	})
})
