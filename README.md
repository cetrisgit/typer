# Typer

A Python CLI library for building command-line applications.

## Installation

```bash
pip install .
```

For development:

```bash
pip install -e ".[dev]"
```

## Usage

```python
from typer.main import main

if __name__ == "__main__":
    main()
```

Or run directly:

```bash
typer
```

## Development

### Setup

1. Clone the repository
2. Install development dependencies:
   ```bash
   pip install -e ".[dev]"
   ```

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black typer tests
ruff check typer tests
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.