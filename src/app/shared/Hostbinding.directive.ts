import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[apphostbinding]'
})

export class HostbindingDirective {
    @HostBinding('data-toggle.dropdown') dropdown = false;

    constructor() {

    }

    ngOnInit() {

    }

    @HostListener('click') toggleOpen(eventData:Event) {
        this.dropdown = ! this.dropdown;
    }
}