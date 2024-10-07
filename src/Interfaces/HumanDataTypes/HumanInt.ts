import { AbstractHumanType } from "./AbstractHumanType"
class HumanInt extends AbstractHumanType  {
	constructor(private value: number) {
		super(value)
	}
	validate(value: any): void {
		if (typeof value !== "number" || ~~value !== value) {
			throw "Must be a number"
		}
	}

	toNumber(): number {
		return this.value
	}
}

export default HumanInt
