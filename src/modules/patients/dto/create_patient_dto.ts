import { IsString, IsArray, IsNumber} from 'class-validator';

export default class CreatePatientDto {
    @IsString()
    name : string;
    
    @IsString()
    lastname : string;
    
    @IsString()
    dni : string;
    
    @IsString()
    phone : string;
    
    @IsString()
    address : string
}