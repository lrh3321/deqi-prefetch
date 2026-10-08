import { AbstractRebuilder } from './base';
import { Boluomao, RRSSK } from './rrssk';
import { Cuoceng } from './cuoceng';
import { DDxs } from './ddxiaoshuo';
import { Deqi } from './deqixs';
import { Dmxs } from './dmxs';
import { KSW81 } from './81ksw';
import { Kudushu } from './kudushu';
import { WanbenRebuilder } from './wanben';
export { handleBiqu33Route } from './biqu33';

export const rebuilders: AbstractRebuilder[] = [
	new Boluomao(),
	new Cuoceng(),
	new DDxs(),
	new Deqi(),
	new Dmxs(),
	new KSW81(),
	new Kudushu(),
	new WanbenRebuilder(),
	new RRSSK()
];
