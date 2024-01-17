import 'jest-preset-angular/setup-jest'
import '@angular/localize/init'; 
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });