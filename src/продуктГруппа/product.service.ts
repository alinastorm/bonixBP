import { Injectable } from '@nestjs/common';
import { Программа1сУпр } from "../_commons/services/1сProgramm/upr.service"

@Injectable()
export class ProductService {

    constructor(private программа1сУпр: Программа1сУпр) { }
    /** проверяет почту checkEmail*/
    проверитьПочту() {
        //TODO регламент
    }
    /** проверяет почту с экономическим обоснованием */
    получитьЭкономическоеОбоснование() {
        //TODO регламеент запуска
    }
    /** согласовывает экономическим обоснование */
    согласоватьЭкономическогоОбоснование() {
        //TODO регламеент запуска
        this.провестиЦенообразование()
    }
    /** провести процедуру ценообразования */
    провестиЦенообразование() {
        //TODO 
        this.выгрузитьЦеныВ1сУпр()
    }
    /** выгрузить цены в 1с управление */
    выгрузитьЦеныВ1сУпр() {
        //TODO this.программа1сУпр. какой документ?

        this.оповеститьОтделПродажОГотовностиТовара()
    }
    /** оповестить отдел продаж о том что товар готов к реализации */
    оповеститьОтделПродажОГотовностиТовара() {
        //TODO 
    }

}
