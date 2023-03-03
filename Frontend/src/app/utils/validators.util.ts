import { FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function hasError(control: FormControl | AbstractControl | undefined | null, errorType: string): boolean {
    if (control) {
        return control.hasError(errorType) && control.invalid && (control.dirty || control.touched);
    }
    return false;
}

export function disallowedWords(words: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && words.some(word => value.includes(word))) {
            return { disallowedWords: true }
        }
        return null;
    };
}
