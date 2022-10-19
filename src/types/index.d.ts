export type { defualt as WebpackInstance } from './WebpackInstance';
export interface Command {
    name: string;
    description: string;
    execute: () => void;
}
