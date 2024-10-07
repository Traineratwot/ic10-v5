export abstract class AbstractHumanType {
	constructor(value: any) {
		this.validate(value)
	}

	abstract validate(value: any): void

	abstract toNumber(): number
}
