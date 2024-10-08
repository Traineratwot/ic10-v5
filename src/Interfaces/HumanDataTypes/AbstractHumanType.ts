export abstract class AbstractHumanType {
	protected constructor(value: any) {
		this.validate(value)
	}

	abstract validate(value: any): void

	abstract toNumber(): number
}

export abstract class AbstractHumanTypeLink extends AbstractHumanType{
	constructor(value: any) {
		super(value)
	}
}
