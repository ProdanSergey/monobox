import { flatten } from 'flat';
import { get } from 'lodash';
import { NotFoundError } from "../definitions/error.definition";
import { Appointment } from "../entities/appointment.entity";
import { Doctor } from "../entities/doctor.entity";
import { Facility } from "../entities/facility.entity";
import { Entity } from "./entity.service";

type TableName = 'appointments' | 'facilities' | 'doctors';

const DB = {
	appointments: [] as Appointment[],
	facilities: [] as Facility[],
	doctors: [] as Doctor[]
};

type PartialEntity<T> = Partial<Record<keyof T, any>>; 

export class Repository<T extends Entity> {
	constructor(private readonly name: TableName) {}

	insert(entity: T): T {
		const repository = DB[this.name] as T[];

		repository.push(entity)

		return entity;
	}

	update(value: PartialEntity<T>, id: string): T | never {
		const repository = DB[this.name] as T[];
		
		const index = repository.findIndex(e => e.id === id);

		if (index < 0) {
			throw new NotFoundError()
		}

		const entity = repository[index];

		const updateKeys = Object.getOwnPropertyNames(value) as (keyof T)[]

		for (const key of updateKeys) {
			entity[key]	= value[key];
		}

		return repository[index];
	}

	delete(id: string): T | never {
		const repository = DB[this.name] as T[];

		const index = repository.findIndex(e => e.id === id);
		
		if (index < 0) {
			throw new NotFoundError()
		}

		const [deleted] = repository.splice(index, 1);

		return deleted;
	}

	findOne(where: PartialEntity<T>): T | void {
		const repository = DB[this.name] as T[];

		const index = repository.findIndex(e => {
			const map = flatten<PartialEntity<T>, Record<string, unknown>>(where)
			
			return Object.keys(map).every(key => get(where, key) === get(e, key))
		});

		return repository[index];
	}

	findOneOrFail(where: PartialEntity<T>): T | never {
		const match = this.findOne(where);

		if (!match) {
			throw new NotFoundError();
		}

		return match;
	}

	findMany(where: PartialEntity<T>): T[] {
		const repository = DB[this.name] as T[];

		return repository.filter(e => {
			const keys = Object.getOwnPropertyNames(where) as (keyof T)[]
			
			return keys.some(key => where[key] === e[key])
		});
	}
}