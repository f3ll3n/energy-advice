import monsterWhite from "../assets/drinks/monster-white.jpg";
import monsterMangoLoco from "../assets/drinks/monster-mango-loco.jpg";
import monsterClassic from "../assets/drinks/monster-classic.jpg";
import monsterDoctor from "../assets/drinks/monster-doctor.jpg";
import monsterNitro from "../assets/drinks/monster-nitro.jpg";
import redBull from "../assets/drinks/red-bull.jpg";
import litEnergy from "../assets/drinks/boykisser-energy.jpg";
import genesis from "../assets/drinks/genesis.jpg";
import driveRed from "../assets/drinks/drive-red.jpg";
import driveGreen from "../assets/drinks/drive-green.jpg";
import burnGreen from "../assets/drinks/burn-green.jpg";
import burnClassic from "../assets/drinks/burn-classic.jpg";
import flash from "../assets/drinks/flash.jpg";
import tornado from "../assets/drinks/tornado.jpg";
import eon from "../assets/drinks/eon.jpg";
import adrenaline from "../assets/drinks/adrenaline.jpg";
import adrenalineWhite from "../assets/drinks/adrenaline-white.jpg";

export const DRINKS = [
  {
    id: "monster-white",
    name: "Monster White",
    description: "Белый Монстр. Мягкий, почти невинный на вид — но заряжает так же.",
    image: monsterWhite,
  },
  {
    id: "monster-mango-loco",
    name: "Monster Mango Loco",
    description: "Манго, которое бьёт током. Тропики на максималках.",
    image: monsterMangoLoco,
  },
  {
    id: "monster-classic",
    name: "Monster",
    description: "Классика жанра. Тот самый зелёный коготь, с которого всё начиналось.",
    image: monsterClassic,
  },
  {
    id: "monster-doctor",
    name: "Monster The Doctor",
    description: "Доктор пропишет бодрость. Травяной вкус для ценителей.",
    image: monsterDoctor,
  },
  {
    id: "monster-nitro",
    name: "Monster The Nitro",
    description: "Нитро-ускорение в банке. Для тех, кому обычного Монстра уже мало.",
    image: monsterNitro,
  },
  {
    id: "red-bull",
    name: "Red Bull",
    description: "Крылья прилагаются. Проверенный вариант на все случаи жизни.",
    image: redBull,
  },
  {
    id: "lit-energy",
    name: "Lit Energy",
    description: "Разгорается быстро и надолго. Для вечеров, которые не должны заканчиваться.",
    image: litEnergy,
  },
  {
    id: "genesis",
    name: "Genesis",
    description: "Начало энергетической эры. Плотный вкус, без компромиссов.",
    image: genesis,
  },
  {
    id: "drive-red",
    name: "Drive Red",
    description: "Красная линия разгона. Для тех, кто спешит.",
    image: driveRed,
  },
  {
    id: "drive-green",
    name: "Drive Green",
    description: "Зелёный свет на всю ночь. Мягче, чем красный, но не менее бодрит.",
    image: driveGreen,
  },
  {
    id: "burn-green",
    name: "Burn Green",
    description: "Горит по-зелёному. Освежающий и колкий.",
    image: burnGreen,
  },
  {
    id: "burn-classic",
    name: "Burn",
    description: "Ожог гарантирован — в самом приятном смысле.",
    image: burnClassic,
  },
  {
    id: "flash",
    name: "Flash",
    description: "Быстрее, чем ты успеешь пожалеть о покупке.",
    image: flash,
  },
  {
    id: "tornado",
    name: "Tornado",
    description: "Смерч в банке. Сносит сон напрочь.",
    image: tornado,
  },
  {
    id: "eon",
    name: "EON",
    description: "Энергия на века. Строгий вкус для серьёзных дел.",
    image: eon,
  },
  {
    id: "adrenaline",
    name: "Adrenaline Default",
    description: "Чистый выброс адреналина. Без лишних слов.",
    image: adrenaline,
  },
  {
    id: "adrenaline-white",
    name: "Adrenaline White",
    description: "Адреналин, но вежливый. Мягче оригинала.",
    image: adrenalineWhite,
  },
];

export const TIMING_OPTIONS = [
  { id: "asap", label: "Как можно скорее", hint: "прямо сейчас бы выпил" },
  { id: "today", label: "Сегодня", hint: "в течение дня" },
  { id: "tomorrow", label: "Завтра", hint: "не горит, но скоро" },
  { id: "this-week", label: "На этой неделе", hint: "как будет повод" },
  { id: "no-rush", label: "Как получится", hint: "особо не тороплюсь" },
];
