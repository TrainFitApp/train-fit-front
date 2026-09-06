import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { resolveExerciseImageUrl } from 'src/app/core/utils/exercise-image-url.util';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(url: string) {
    const resolvedUrl = resolveExerciseImageUrl(url);
    if (!resolvedUrl) return;
    return this.sanitizer.bypassSecurityTrustUrl(resolvedUrl);
  }
}
