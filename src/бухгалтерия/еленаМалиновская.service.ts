import { Injectable } from '@nestjs/common';
import { Бухгалтерия } from './accaunting.service'



/** Бухгалтерия */
@Injectable()
export class ЕленаМалиновская extends Бухгалтерия {

    /** закрытие Валютных Договоров */
    закрытиеВалютныхДоговоров() { }
    
}