export function getFrequency(keyName) {
    let freq = 0;
    switch(keyName) {
        case 'a': 
            freq = 1047;
            break;
        case 's':
            freq = 1175;
            break;
        case 'd':
            freq = 1319;
            break;
        case 'f':
            freq = 1397;
            break;
        case 'g':
            freq = 1568;
            break;
        case 'h':
            freq = 1760;
            break;
        case 'j':
            freq = 1976;
            break;
        case 'k':
            freq = 2093;
            break;
        case 'l':
            freq = 2217;
            break;
        case 'm':
            freq = 1;
            break;
        case 'n':
            freq = 2;
            break;
        case 'b':
            freq = 3;
            break;
    }

    return freq;
}