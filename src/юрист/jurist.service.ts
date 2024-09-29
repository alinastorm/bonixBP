import { Kartoteka_by } from "src/_commons/services/kartoteka_by/kartoteka_by.service";

/**  */
export class Jurist {
    constructor(
        private kartoteka_by: Kartoteka_by
    ) { }
    проверкаКлиентовПоКартотеке() {
        this.kartoteka_by.проверкаКлиентовПоКартотеке()
    }
    /** проверкаРешенияОбОтсрочке
     * Алина Желинская специалист по тендерам но она  как помощник юриста проверяет по картотеке клиентов
     * Изначально устраивалась как помощник юриста
     * В итоге принимает решение можно ли давать отсрочку
     */
    проверкаРешенияОбОтсрочке() { }

}