export default interface BaseEvent {
    
    readonly name: string;
    readonly once: boolean;
    readonly execute: Function;
    
}