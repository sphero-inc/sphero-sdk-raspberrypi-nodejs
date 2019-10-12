
export class Version {
    private readonly _major: number;
    public get major(): number {
        return this._major;
    }
    private readonly _minor: number;
    public get minor(): number {
        return this._minor;
    }
    private readonly _revision: number;
    public get revision(): number {
        return this._revision;
    }

    private static readonly _version0: Version = new Version(0, 0, 0);

    constructor(major: number, minor: number, revision: number) {
        this._major = major;
        this._minor = minor;
        this._revision = revision;
    }

    public isGreaterThan(other: Version) {
        if (this._major != other._major) {
            if (this._major > other._major)
                return true;
            else if (this._major < other._major)
                return false;
        }

        if (this._minor != other._minor) {
            if (this._minor > other._minor)
                return true;
            else if (this._minor < other._minor)
                return false;
        }

        if (this._revision != other._revision) {
            if (this._revision > other._revision)
                return true;
            else if (this._revision < other._revision)
                return false;
        }

        return false;
    }

    public equals(other: Version) {
        return (this._major == other._major && this._minor == other._minor && this._revision == other._revision) ? true : false;
    }

    public static versionStringToVersionObject(versionString: string): Version {
        let versionComponents: Array<string> = versionString.split('.');
        return new Version(parseInt(versionComponents[0]), parseInt(versionComponents[1]), parseInt(versionComponents[2]));
    }

    public static versionObjectToVersionString(versionObject: Version): string {
        return `${versionObject.major}.${versionObject.minor}.${versionObject.revision}`;
    }

    public static latestVersionOf(versions: Array<Version>): Version {
        if(versions.length < 1) {
            throw new Error('Expected list of at least one element as input.');
        }
        let latestVersionNumber: Version = Version._version0;
        for(let version of versions) {
            if (version.isGreaterThan(latestVersionNumber))
                latestVersionNumber = version;
        }

        return latestVersionNumber;
    }

}