const DATE = (function () {
	const ZODIAC = [
		[19, 'Capricorn', '♑'], // 1
		[18, 'Aquarius', '♒'], // 2
		[20, 'Pisces', '♓'], // 3
		[19, 'Aries', '♈'], // 4
		[20, 'Taurus', '♉'], // 5
		[20, 'Gemini', '♊'], // 6
		[22, 'Cancer', '♋'], // 7
		[22, 'Leo', '♌'], // 8  
		[22, 'Virgo', '♍'], // 9
		[22, 'Libra', '♎'], // 10
		[21, 'Scorpio', '♏'], // 11
		[21, 'Sagittarius', '♐'], // 12
	];

	return {
		isLeapYear(year) {
			return this.getMaxDay(year, 2) > 28;
		},
		getMaxDay(year, month) {
			return new Date(year, month, 0).getDate();
		},
		getZodiac(month, day) {
			if (month && day) {
				const [lastDay, ...zodiac] = ZODIAC[month - 1];
	
				if (day <= lastDay) {
					return zodiac;
				} else {
					return (month < ZODIAC.length ? ZODIAC[month] : ZODIAC[0]).slice(1);
				}
			}

			return [];
		}
	};
})();