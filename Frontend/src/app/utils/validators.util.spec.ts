import { FormControl, Validators } from "@angular/forms"
import { disallowedWords, hasError } from "./validators.util"


describe('Validators utils', () => {
    describe('hasError', () => {
        it('should return true when required control empty', () => {
            const control = new FormControl('', [Validators.required]);
            control.markAllAsTouched();
            expect(hasError(control, 'required')).toBeTrue();
        });
        it('should return false when required control has value', () => {
            const control = new FormControl('aaa', [Validators.required]);
            control.markAllAsTouched();
            expect(hasError(control, 'required')).toBeFalse();
        });

        it('should return false when control not found', () => {
            expect(hasError(null, 'required')).toBeFalse();
        });
    });

    describe('disallowedWords', () => {
        it('should return true when control has disallowed words', () => {
            const control = new FormControl('There are no disallowed words', [disallowedWords(['yes', 'no'])]);
            control.markAllAsTouched();
            expect(hasError(control, 'disallowedWords')).toBeTrue();
        });

        it('should return false when control has not disallowed words', () => {
            const control = new FormControl('There are text with allowed words', [disallowedWords(['yes', 'no'])]);
            control.markAllAsTouched();
            expect(hasError(control, 'disallowedWords')).toBeFalse();
        });
    });
});

