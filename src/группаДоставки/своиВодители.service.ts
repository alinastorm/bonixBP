import { OKS } from 'src/группаОкс/oks.service'
import { ElenaMalinovskaya } from '../Бухгалтерия/еленаМалиновская.service'


/**
 * Александр Баркун водитель
 * Денис Курилович водитель
 * Кирилл Окур водитель
 * Ланкевич Юрий водитель
 */



export class VoditelShatnij {

    constructor(
        private еленаМалиновская: ElenaMalinovskaya,
        private OKS: OKS,
    ) { }

    /** закрыть кассовую смену
     * В конце каждой смены водитель за кем закреплена касса
     * Закрывает смену 
     * Привозит z отчет
     * Накладные 
     * Заявки
     */
    закрытьСменуКассовогоАппарата() {
        const zотчет = {}
        const накладные = {}
        const заявки = {}
        const инфОбОплате = {}
        this.еленаМалиновская.принятьОтчетОбОплатеКонтрагентаОтВодителя(инфОбОплате, zотчет, накладные, заявки)
    }
    /** водитель Вернул Командировку
     * В утреннее время занимаемся документооборотом-разбор всех документов полученных из рейсов за предыдущие дни
     * Мы вносим по его путевому пробег
     * Начальный и конечный пробег , топливо
     * Вносим км между городами
     * Все это нужно для зарплаты водителей дальше у Елены Шнвчук
     */
    водительВернулКомандировку() {
        this.OKS.получитьДокументыИзРейсаВодителя()
    }
}

