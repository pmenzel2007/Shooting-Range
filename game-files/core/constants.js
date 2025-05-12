//World Variables
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

const ARENA_WIDTH = 3000;
const ARENA_HEIGHT = 3000;

const STARTING_SPAWN_INTERVAL = 5000;
const MIN_SPAWN_INTERVAL = 1000;
const SPAWN_DECREASE_RATE = 0.95;
const SPAWN_TYPES = ['crawler', 'sprinter', 'spitter'];
const MIN_SPAWN_DISTANCE = 800;

//Player Variables
const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

const PLAYER_SPAWN_X = ARENA_WIDTH / 2 - PLAYER_WIDTH / 2;
const PLAYER_SPAWN_Y = ARENA_HEIGHT / 2 - PLAYER_HEIGHT / 2;

const PLAYER_BASE_SPEED = 12;

const PLAYER_INVUL_TIME = 50;

//Hunter Variables
const HUNTER_SPEED_MODIFIER = 0.7;
const HUNTER_HP = 2;
const HUNTER_RANGE = 1000;

const ARROW_WIDTH = 48;
const ARROW_HEIGHT = 48;
const ARROW_SPEED = 48;
const ARROW_PIERCE = 2;
const ARROW_DAMAGE = 20;

//Enemy Variables

//Crawler Variables
const CRAWLER_WIDTH = 96;
const CRAWLER_HEIGHT = 96;

const CRAWLER_BASE_SPEED = 6;

const CRAWLER_BASE_HP = 20;
const CRAWLER_BASE_HP_INCREASE = 0.3;

//Sprinter Variables
const SPRINTER_WIDTH = 72;
const SPRINTER_HEIGHT = 72;

const SPRINTER_BASE_SPEED = 12;

const SPRINTER_BASE_HP = 10;
const SPRINTER_BASE_HP_INCREASE = 0.1;

//Spitter Variables
const SPITTER_WIDTH = 96;
const SPITTER_HEIGHT = 96;

const SPITTER_BASE_SPEED = 4;

const SPITTER_BASE_HP = 10;
const SPITTER_BASE_HP_INCREASE = 0.1;

const SPITTER_RANGE = 700;

const SPIT_WIDTH = 48;
const SPIT_HEIGHT = 48;
const SPIT_SPEED = 24;

//Misc Variables