export default class Timeout  {
	execs: Map<string, Function> = new Map();
	started: boolean = false;
    timer: number = 1000 * 60 * 60;

	/**
	 * Создает экземпляр Timeout
	 * @param  {number} timer=1000*60*60 Кол-во миллисекунд
	 * @param  {boolean} start=false Стартовать с инициализацией
	 */
	constructor(timer: number = 1000 * 60 * 60, start: boolean = false) {
		this.timer = timer;
		if (start) this.start();
	}

	/**
	 * Запускает таймер
	 * @returns {boolean}
	 */
	start(): boolean {
		if (!this.started) {
			this.started = true;
			this.#execute();
		}
		return this.started;
	}

	/**
	 * Добавить в расписание выполняемую функцию
	 * @param  {string} k="" Уникальный ключ
	 * @param  {Function} v=()=>{} Исполняемый код
	 */
	add(k: string, v: Function): boolean {
        this.execs.set(k, v);
        return true;
	}

	/**
	 * Удалить из расписание выполняемую функцию
	 * @param  {string} k="" Уникальный ключ
	 */
	delete(k: string): boolean {
        this.execs.delete(k);
        return true;
	}

	#execute(): void {
		setTimeout(() => {
			this.started = true;
			this.execs.forEach((value, key) => {
				try {
					value();
				} catch (e) {
					console.error(`[STRUCTURES/TIMEOUT] Ошибка выполнения ${key}: ${e}`);
				}
			});
			this.#execute();
		}, !this.started ? 1000 : this.timer);
	}
}