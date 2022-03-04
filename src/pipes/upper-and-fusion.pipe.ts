import { ArgumentMetadata, Body, Injectable, PipeTransform, Post } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  
  transform(entry: {daa:string[]}, metadata: ArgumentMetadata) {
    if(metadata.type=='body'){
      return entry.daa.map((element)=>element.toLocaleUpperCase()).join('-');
    }
    return entry;
  }
  
}
