import HumanInt from "./HumanInt"
class HumanFloat extends HumanInt {
	validate(value: any): void {
		if (typeof value !== "number") {
			throw "Must be a number"
		}
	}
}

export default HumanFloat
