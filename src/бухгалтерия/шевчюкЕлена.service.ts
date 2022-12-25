import { Injectable } from '@nestjs/common';
import { Бухгалтерия } from './accaunting.service'



/** Бухгалтерия AccauntingDepartmentService */
@Injectable()
export class ЕленаШевчюк extends Бухгалтерия {



    /** только расходная часть */
    импортироватьДокументыППВИзБухВУпр() {
        super.импортироватьДокументыППВИзБухВУпр()        
    }

}