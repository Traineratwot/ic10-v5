class SocketMemory {
	private readonly registers: Map<number, number> = new Map<number, number>()
	private readonly stack: Array<number> = []
	private readonly pins: Map<number, string> = new Map<number, string>()

	constructor(public readonly stackLimit = 512) {}

	attachDevice(pin: number, device: any) {
		this.pins.set(pin, device)
	}

	detachDevice(pin: number) {
		this.pins.delete(pin)
	}

	setRegisters(reg: number, value: number) {
		this.registers.set(reg, value)
	}

	getRegisters(reg: number): number {
		return this.registers.get(reg) || 0
	}
}
export default SocketMemory
