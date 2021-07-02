import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'oc-initials',
    templateUrl: './oc-initials.component.html',
    styleUrls: ['./oc-initials.component.scss'],
})
export class OcInitialsComponent implements OnInit {
    @Input() initialsImageURL: string;
    @Input() initialsName: string;
    @Input() primaryInitialType: 'name' | 'image' = 'name';
    @Input() initialsNameCharactersLimit: number = 2;

    tempInitialType: 'name' | 'image';
    tempInitialsName: string = '';

    private letterRegex = /[a-zA-Z]/;

    constructor() {}

    ngOnInit(): void {
        if (this.primaryInitialType === 'image' && this.initialsImageURL) {
            this.tempInitialType = 'image';
        } else {
            this.tempInitialsName = this.createNameInitials(this.initialsName, this.initialsNameCharactersLimit) || '';
            this.tempInitialType = 'name';
        }
    }

    createNameInitials(name: string, characterLimit: number): string | null {
        if (name && characterLimit > 0) {
            return name
                .split(' ')
                .map(part => part[0])
                .filter(charValue => this.letterRegex.test(charValue))
                .join('')
                .substring(0, characterLimit)
                .toUpperCase();
        }
        return null;
    }
}
