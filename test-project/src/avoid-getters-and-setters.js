// Non-compliant: the object parameter defaults getter and setter are overriden
const circle = {
	_radius: 42,
	get radius() {
		return this._radius;
	},
	set radius(value) {
		this._radius = value;
	},
};

// Compliant: the class getter does not return simply a class parameter
class circle2 {
	_radius = 42;
	get diameter() {
		return this._radius * 2 * Math.PI;
	}
};
